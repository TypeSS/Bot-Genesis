"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Role } from "@/lib/types";
import { Button } from "@base-ui/react";
import { Controller } from "react-hook-form";

export default function TriggerCard({
  roles,
  form,
  index,
  remove,
}: {
  roles: Role[];
  form: any;
  index: number;
  remove: (index: number) => void;
}) {
  return (
    <FieldGroup className="flex flex-row gap-2">
      <Controller
        name={`triggers.${index}.id`}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="w-64"
              placeholder="Gatilho"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name={`triggers.${index}.content`}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="w-64"
              placeholder="Mensagem"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name={`triggers.${index}.allowed_roles`}
        control={form.control}
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid}>
              <Combobox items={roles} multiple onValueChange={field.onChange} value={field.value}>
                <ComboboxChips className="w-64">
                  <ComboboxValue>
                    {field.value?.map((item: string) => {
                      return (
                        <ComboboxChip key={item}>
                          {roles.find((r) => r.id === item)?.name}
                        </ComboboxChip>
                      );
                    })}
                  </ComboboxValue>
                  <ComboboxChipsInput placeholder="Cargos" />
                </ComboboxChips>
                <ComboboxContent>
                  <ComboboxEmpty>Nenhum cargo encontrado.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.id} value={item.id}>
                        {item.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
      <Button onClick={() => remove(index)}>X</Button>
    </FieldGroup>
  );
}
