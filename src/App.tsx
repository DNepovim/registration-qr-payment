import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { config } from "./config";
import { getMemberPaymentCategory } from "./utils/getMemberPrice";
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
        <h1 className="m-0 font-head text-orange-950 text-6xl">
          Registrace na rok 2026
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
              povinné odvody vyšším organizačním jednotkám v&nbsp;rámci
              celostátní organizace
              Junák&nbsp;–&nbsp;český&nbsp;skaut,&nbsp;z.&nbsp;s.;
            </li>
            <li>
              provozní náklady střediskových základen, zejména energie, údržba
              a&nbsp;drobné opravy: skautský dům Bára v&nbsp;Kralupech, chata
              Dřevomorka v&nbsp;Lužických horách a&nbsp;táborová základna
              Puchverk v&nbsp;Pošumaví;
            </li>
            <li>
              obnova a&nbsp;doplnění zejména táborového vybavení (teepee,
              plachty na&nbsp;kuchyň apod.) pro bezproblémové zajištění letních
              táborů na&nbsp;Střele;
            </li>
            <li>
              část celkové rekonstrukce chaty Dřevomorka jejíž předmětem je
              celková elektroinstalace, hydroizolace, nevyhovující části střechy
              a&nbsp;částečně i&nbsp;vybavení interiéru.
            </li>
          </ul>
        </Accordion>
        <Accordion title="Sponzorský dar">
          <p className="mt-0">
            Vzhledem k&nbsp;výše zmíněné potřebě velké rekonstrukce chaty
            Dřevomorka, kde naše oddíly tráví víkendové výpravy
            i&nbsp;Silvestrovské a&nbsp;Velikonoční akce a&nbsp;slouží
            i&nbsp;jako táborová základna pro naše nejmladší členy, zavádíme
            nově Sponzorské členství. Rekonstrukci nejsme schopni ufinancovat
            z&nbsp;běžných vlastních příjmů, proto žádáme o&nbsp;různé dotační
            programy a&nbsp;rozhodli jsme se i&nbsp;pro tuto formu získání
            finančních prostředků. Zda se rozhodnete pro sponzorské členství je
            čistě na&nbsp;vás, budeme za&nbsp;něj však velice vděčni.
            Samozřejmostí je vystavení potvrzení o&nbsp;sponzorském daru,
            po&nbsp;domluvě vás rádi uvedeme i&nbsp;na&nbsp;našich webových
            stránkách. Zároveň se můžete těšit na&nbsp;drobné překvapení, které
            vám společně zašleme.
          </p>
        </Accordion>
        <Accordion title="Výše registrace">
          <p className="mt-0 text-lg">
            <table className="m-0 max-w-60">
              <tr>
                <td>Základní</td>
                <td>
                  <strong>2&nbsp;000&nbsp;Kč</strong>
                </td>
              </tr>
              <tr>
                <td>Druhý z rodiny</td>
                <td>
                  <strong>1&nbsp;600&nbsp;Kč</strong>
                </td>
              </tr>
              <tr>
                <td>Třetí z rodiny</td>
                <td>
                  <strong>1&nbsp;300&nbsp;Kč</strong>
                </td>
              </tr>
              <tr>
                <td>Veodoucí</td>
                <td>
                  <strong>1&nbsp;000&nbsp;Kč</strong>
                </td>
              </tr>
              <tr>
                <td>Sponzor</td>
                <td>
                  <strong>5&nbsp;000&nbsp;Kč</strong>
                </td>
              </tr>
            </table>
            Je to složité? Využijte generátor níže.
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
                  <p className="mb-0 mt-2 text-center sm:mt-4">
                    <strong className="text-2xl">
                      {getMemberPaymentCategory(
                        values.members,
                        i,
                      )?.price.toLocaleString("cs")}
                      &nbsp;Kč
                    </strong>
                    &nbsp;
                    <span className="text-s block text-gray-700">
                      {getMemberPaymentCategory(values.members, i)?.name}
                    </span>
                  </p>
                </div>
                {fields.length > 1 && (
                  <RemoveButton
                    className="mt-2 self-end justify-self-end sm:mt-4"
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
                <div className="mb-2">Přidat člena rodiny</div>
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
                  <tr>
                    <td>VS: </td>
                    <td>
                      <strong>{values.members[0].birth}</strong>
                    </td>
                  </tr>
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
                        {getReceiverMessage(values)}
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
            className={`flex w-full flex-col items-center justify-center rounded-lg border-4 border-dashed border-orange-950 border-opacity-50 p-4 text-center text-xl text-orange-950 sm:p-10`}
          >
            Po vyplnění všech údajů se zde zobrazí platební údaje.
          </div>
        )}
      </div>
      <footer className="mt-8 pb-4 text-center text-sm text-gray-700">
        <a
          href="mailto:nik@skaut.cz?subject=Chyba v aplikaci registrace.strelka.cz"
          target="_blank"
        >
          Nahlásit chybu
        </a>
        ,{" "}
        <a
          href="https://github.com/DNepovim/registration-qr-payment"
          target="_blank"
        >
          GitHub
        </a>
        , aplikaci vyrobil{" "}
        <a href="https://www.dominikblaha.cz" target="_blank">
          Nik
        </a>
        .
      </footer>
    </main>
  );
};
