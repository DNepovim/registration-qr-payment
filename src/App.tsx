import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { config } from "./config";
import { getMemberPaymentCatogory } from "./utils/getMemberPrice";
import { Input } from "./components/Input";
import { Toggler } from "./components/Toggler";
import { Card } from "./components/Card";
import { RemoveButton } from "./components/RemoveButton";
import { QrCode } from "./components/QrCode";
import { getFinalPrice } from "./utils/getFinalPrice";
import { getReceiverMessage } from "./utils/getReceiverMessage";
import { Accordion } from "./components/Accordion";
import { H2 } from "./components/H2";
import { ErrorBoundary } from "react-error-boundary";

const memberSchema = z.object({
  name: z.string().min(1, { message: "Musíte zadat jméno." }),
  birth: z
    .string()
    .min(1, { message: "Musíte zadat rodné číslo." })
    .min(6, { message: "Rodné číslo musí mít 6 číslic." }),
  isLeader: z.boolean().default(false),
  isSponsor: z.boolean().default(false),
});

export type FormMember = z.infer<typeof memberSchema>;

const schema = z.object({
  members: z.array(memberSchema),
  wantGiftConfirmation: z.boolean().optional(),
  wantBeOnWeb: z.boolean().optional(),
});

export type FormSchema = z.infer<typeof schema>;

export const App = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormSchema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      members: [{ name: "", isLeader: false, isSponsor: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const values = watch();

  const isSponsor = values.members.some((m) => m.isSponsor);

  return (
    <main className="prose prose-neutral h-full min-h-screen w-screen max-w-none bg-bg">
      <div className="mx-auto max-w-4xl rounded-md p-4">
        <h1 className="m-0 font-head text-orange-950">
          Registrace na rok 2025
        </h1>
        <p className="m-0 mb-4">
          Skautské středisko Střelka Kralupy nad Vltavou,{" "}
          <a href="https://www.strelka.cz" target="_blank">
            www.strelka.cz
          </a>
          .
        </p>
        <Accordion title="Na co budou peníze z registrace využity?">
          <p className="mb-2 mt-0">
            Finanční prostředky získané v rámci registrace naše středisko
            použije zejména na následující položky:
          </p>
          <ul className="not-prose mb-4 list-disc pl-4">
            <li>
              povinné odvody vyšším organizačním jednotkám v rámci celostátní
              organizace Junák - český skaut, z. s.;
            </li>
            <li>
              provozní náklady střediskových základen, zejména energie, údržba a
              drobné opravy: skautský dům Bára v Kralupech, chata Dřevomorka v
              Lužických horách a táborová základna Puchverk v Pošumaví;
            </li>
            <li>
              obnova a doplnění zejména táborového vybavení (teepee, plachty na
              kuchyň apod.) pro bezproblémové zajištění letních táborů na
              Střele;
            </li>
            <li>
              část celkové rekonstrukce chaty Dřevomorka jejíž předmětem je
              celková elektroinstalace, hydroizolace, nevyhovující části střechy
              a částečně i vybavení interiéru.
            </li>
          </ul>
        </Accordion>
        <Accordion title="Sponzorský dar">
          <p className="mt-0">
            Vzhledem k výše zmíněné potřebě velké rekonstrukce chaty Dřevomorka,
            kde naše oddíly tráví víkendové výpravy i Silvestrovské a
            Velikonoční akce a slouží i jako táborová základna pro naše
            nejmladší členy, zavádíme nově Sponzorské členství. Rekonstrukci
            nejsme schopni ufinancovat z běžných vlastních příjmů, proto žádáme
            o různé dotační programy a rozhodli jsme se i pro tuto formu získání
            finančních prostředků. Zda se rozhodnete pro sponzorské členství je
            čistě na vás, budeme za něj však velice vděčni. Samozřejmostí je
            vystavení potvrzení o sponzorském daru, po domluvě vás rádi uvedeme
            i na našich webových stránkách. Zároveň se můžete těšit na drobné
            překvapení, které vám společně zašleme.
          </p>
        </Accordion>
        <form onSubmit={handleSubmit(() => {})}>
          <H2 className="mt-4">Členové:</H2>
          <div className="grid gap-4 md:grid-cols-3">
            {fields.map(({ id }, i) => (
              <Card key={id}>
                <div className="flex flex-col gap-2">
                  <Input
                    label="Jméno a příjmení"
                    {...register(`members.${i}.name`)}
                    error={errors.members?.[i]?.name?.message}
                  />
                  <Input
                    label="Rodné číslo"
                    description="část před lomítkem"
                    maxLength={6}
                    minLength={6}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                    }}
                    {...register(`members.${i}.birth`)}
                    error={errors.members?.[i]?.birth?.message}
                  />
                  <Toggler
                    label="Vedoucí"
                    {...register(`members.${i}.isLeader`)}
                    disabled={values.members[i].isSponsor}
                  />
                  <Toggler
                    label="Sponzor"
                    {...register(`members.${i}.isSponsor`)}
                    disabled={values.members[i].isLeader}
                  />
                  <p className="text-center">
                    <strong className="text-2xl">
                      {getMemberPaymentCatogory(
                        values.members,
                        i,
                      )?.price.toLocaleString("cs")}
                      &nbsp;Kč
                    </strong>
                    &nbsp;
                    <span className="block text-s text-gray-700">
                      {getMemberPaymentCatogory(values.members, i)?.name}
                    </span>
                  </p>
                </div>
                {fields.length > 1 && (
                  <RemoveButton
                    className="self-end justify-self-end"
                    onClick={() => remove(i)}
                  />
                )}
              </Card>
            ))}
            <Card
              onClick={() =>
                append({
                  name: "",
                  birth: "",
                  isLeader: false,
                  isSponsor: false,
                })
              }
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="text-8xl">+</div>
                Přidat člena rodiny
              </div>
            </Card>
          </div>
          {isSponsor && (
            <div className="mt-6 flex flex-col gap-2">
              <Toggler
                label="Chci potvrzení o daru"
                {...register("wantGiftConfirmation")}
              />
              <Toggler
                label="Chci být uveden jako dárce na webu střediska"
                {...register("wantBeOnWeb")}
              />
            </div>
          )}
        </form>

        <H2 className="mt-4">Vaše platební údaje:</H2>
        {isValid ? (
          <div className="md:flex">
            <div className="flex-[2]">
              <table className="m-0">
                <tbody>
                  <tr>
                    <td>Cena: </td>
                    <td>
                      <strong>
                        {getFinalPrice(values).toLocaleString("cs")}&nbsp;Kč
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Číslo účtu: </td>
                    <td>
                      <strong>{config.accountNumber}</strong>
                    </td>
                  </tr>
                  {values.members.length === 1 ? (
                    <tr>
                      <td>VS: </td>
                      <td>
                        <strong>{values.members[0].birth}</strong>
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>SS: </td>
                    <td>
                      <strong>{config.specificSymbol}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Zpráva pro příjemce: </td>
                    <td>
                      <strong className="whitespace-pre-line">
                        {getReceiverMessage(values, false)}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-[1] items-start justify-center p-2">
              <ErrorBoundary
                fallback={<p>QR kód se nepodařilo vygenerovat.</p>}
              >
                <QrCode data={values} />
              </ErrorBoundary>
            </div>
          </div>
        ) : (
          <div
            className={`flex w-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-orange-950 border-opacity-50 p-10 text-xl text-orange-950`}
          >
            Po vyplnění všech údajů se zde zobrazí platební údaje.
          </div>
        )}
      </div>
    </main>
  );
};
