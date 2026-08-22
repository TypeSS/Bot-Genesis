"use client";

import { getGuildRoles } from "@/app/actions/discord";
import TriggerCard, { TriggerFormValues } from "@/app/dashboard/_components/trigger-card";
import { Guild, Role } from "@/lib/types";
import { addTrigger, deleteTrigger, getAllTriggers } from "@/app/actions/triggers";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useMemo, useState } from "react";
import { Trigger } from "@genesis/core";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  triggers: z.array(
    z.object({
      id: z.string().min(1, { message: "O gatilho é obrigatório" }),
      content: z.string().min(1, { message: "O conteúdo do gatilho é obrigatório" }),
      allowed_roles: z.array(z.string()),
    }),
  ),
});

export default function Triggers({ guild }: { guild: Guild }) {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<TriggerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      triggers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "triggers",
  });

  useEffect(() => {
    async function load() {
      const [triggers, roles] = await Promise.all([
        getAllTriggers(guild.id),
        getGuildRoles(guild.id),
      ]);

      setTriggers(triggers);
      setRoles(roles);
      setIsLoading(false);

      form.reset({
        triggers: triggers.map((trigger) => ({
          id: trigger.id,
          content: trigger.content,
          allowed_roles: trigger.allowed_roles,
        })),
      });

      append({
        id: "",
        content: "",
        allowed_roles: [],
      });
    }

    load();
  }, [append, form, guild.id]);

  const currentData = useWatch({
    control: form.control,
    name: "triggers",
  });

  const hasChanged = useMemo(() => {
    const originalData = [...triggers];
    originalData.push({
      id: "",
      content: "",
      allowed_roles: [],
    });

    return JSON.stringify(originalData) !== JSON.stringify(currentData);
  }, [currentData, triggers]);

  return (
    <div className="relative h-full">
      <form
        className="flex flex-col gap-2 h-full"
        onSubmit={form.handleSubmit(async (data) => {
          for (const trigger of triggers) {
            if (!data.triggers.find((t) => t.id === trigger.id)) {
              await deleteTrigger(guild.id, trigger.id);
            }
          }
          for (const trigger of data.triggers) {
            await addTrigger(guild.id, trigger);
          }
          window.location.reload();
        })}
      >
        {fields.map((field: Trigger, index: number) => (
          <TriggerCard
            index={index}
            key={field.id}
            roles={roles}
            form={form}
            remove={remove}
          ></TriggerCard>
        ))}
        {hasChanged && !isLoading && (
          <div className="fixed p-5 pl-69 bottom-0 left-0 right-0 z-50 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Alterações não salvas</CardTitle>
                <CardDescription>
                  Tens Alterações não salvas. Clica no botão para guardar.
                </CardDescription>
                <CardAction className="flex h-full items-center">
                  <Button type="submit">Guardar Alterações</Button>
                </CardAction>
              </CardHeader>
            </Card>
          </div>
        )}
      </form>
    </div>
  );
}
