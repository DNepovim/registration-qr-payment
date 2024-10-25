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

const memberSchema = z.object({
  name: z.string().min(1, { message: "Musíte zadat jméno." }),
  birth: z
    .string()
    .min(1, { message: "Musíte zadat rodné číslo." })
    .min(6, { message: "Rodné číslo musí mít 6 číslic." }),
  isLeader: z.boolean().default(false),
});

export type FormMember = z.infer<typeof memberSchema>;

const schema = z.object({
  members: z.array(memberSchema),
  gift: z.coerce.number().optional(),
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
    setValue,
  } = useForm<FormSchema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { members: [{ name: "", isLeader: false }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const values = watch();

  return (
    <main className="prose prose-neutral h-full min-h-screen w-screen max-w-none bg-bg">
      <div className="mx-auto max-w-4xl rounded-md p-4">
        <h1>Registrace na rok 2025</h1>
        <p>
          Skautské středisko Střelka Kralupy nad Vltavou,{" "}
          <a href="https://www.strelka.cz" target="_blank">
            www.strelka.cz
          </a>
          .
        </p>
        <p>
          Finanční prostředky získané v rámci registrace naše středisko použije
          zejména na následující položky:
        </p>
        <ul>
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
            kuchyň apod.) pro bezproblémové zajištění letních táborů na Střele;
          </li>
          <li>
            část celkové rekonstrukce chaty Dřevomorka jejíž předmětem je
            celková elektroinstalace, hydroizolace, nevyhovující části střechy a
            částečně i vybavení interiéru.
          </li>
        </ul>
        <form onSubmit={handleSubmit(() => {})}>
          <h2>Členové</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {fields.map(({ id }, i) => (
              <Card key={id}>
                <div className="flex flex-col gap-4">
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
                  />
                  <p className="text-center">
                    <strong className="text-xl">
                      {getMemberPaymentCatogory(
                        values.members,
                        i,
                      )?.price.toLocaleString("cs")}
                      &nbsp;Kč
                    </strong>
                    &nbsp;
                    <div className="text-xs text-gray-700">
                      {getMemberPaymentCatogory(values.members, i)?.name}
                    </div>
                  </p>
                </div>
                {fields.length > 1 && (
                  <RemoveButton
                    className="justify-self-end"
                    onClick={() => remove(i)}
                  >
                    Odebrat
                  </RemoveButton>
                )}
              </Card>
            ))}
            <Card
              onClick={() => append({ name: "", birth: "", isLeader: false })}
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="text-8xl">+</div>
                Přidat člena rodiny
              </div>
            </Card>
          </div>
          <h2 className="mb-2">Sponzorský dar</h2>
          <p className="text-sm">
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
          <div className="flex flex-col gap-4 md:flex-row">
            {config.gifts.map((g) => (
              <label
                key={g}
                className={`flex min-w-10 flex-1 cursor-pointer justify-center rounded-lg border-4 border-orange-950 border-opacity-50 px-4 py-1 text-xl font-bold text-orange-950 ${Number(values.gift) === g ? "border-solid bg-orange-950 bg-opacity-50 text-white" : "border-dashed"}`}
              >
                <input
                  hidden
                  key={g}
                  {...register("gift", {
                    valueAsNumber: true,
                    onChange: (e) => {
                      const v = Number(e.target.value);
                      setValue("gift", v === values.gift ? undefined : v);
                    },
                  })}
                  type="radio"
                  value={g}
                />
                {g}
              </label>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2">
            {values.gift && (
              <Toggler
                label="Chci potvrzení o daru"
                {...register("wantGiftConfirmation")}
              />
            )}
            {values.gift && (
              <Toggler
                label="Chci být uvden jako dárce na webu střediska"
                {...register("wantBeOnWeb")}
              />
            )}
          </div>
        </form>

        {isValid && (
          <>
            <p className="text-xl">
              Celková výše registrace je{" "}
              <strong>
                {getFinalPrice(values).toLocaleString("cs")}&nbsp;Kč
              </strong>
              .
            </p>
            <QrCode data={values} />
          </>
        )}
      </div>
    </main>
  );
};
