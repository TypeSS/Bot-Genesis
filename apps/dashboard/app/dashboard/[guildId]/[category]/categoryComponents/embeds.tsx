"use client";

import { getGuildChannels, sendEmbed } from "@/app/actions/discord";
import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { decodeEmbedUrl } from "@genesis/core";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Guild } from "@/lib/types";
import { TbInfoCircle } from "react-icons/tb";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  embedUrl: z.string().url({ message: "URL inválida" }),
  channelId: z.string().min(1, { message: "Selecione um canal" }),
});

export default function Embeds({ guild }: { guild: Guild }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getGuildChannels(guild.id).then((res) => {
      const textChannels = res.filter((channel: any) => channel.type === 0);
      setChannels(textChannels);
    });
  }, [guild.id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      embedUrl: "",
      channelId: "",
    },
  });

  const onSubmit = () => {
    return form.handleSubmit(async (data) => {
      try {
        const embedData = decodeEmbedUrl(data.embedUrl);
        sendEmbed(data.channelId, embedData);
      } catch (error) {
        console.error("Erro ao enviar o embed:", error);
      }
    });
  };

  return (
    <form onSubmit={onSubmit()} id="embed" className="flex flex-col gap-4">
      <FieldGroup className="flex flex-row gap-4">
        <Controller
          name="embedUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                URL do Embed
                <TbInfoCircle className="inline-block" />
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="https://glitchii.github.io/embedbuilder/?data=..."
                autoComplete="off"
              ></Input>
              <FieldDescription>Link do embed gerado.</FieldDescription>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="channelId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Canal</FieldLabel>
              <Select name={field.name} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full hover:cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-100">
                  <SelectGroup>
                    <SelectLabel>Canais</SelectLabel>
                    {channels.map((channel: any) => (
                      <SelectItem
                        key={channel.id}
                        value={channel.id}
                        className="hover:cursor-pointer"
                      >
                        {channel.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>Canal onde o embed será enviado.</FieldDescription>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field>
        <Button type="submit" form="embed">
          Enviar
        </Button>
      </Field>
    </form>
  );
}
