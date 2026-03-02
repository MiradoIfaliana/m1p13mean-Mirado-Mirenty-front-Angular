import { z } from 'zod';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

function toUndefined(val: any) {
  if (val === null || val === undefined || val === '') {
    return undefined;
  }
  return val;
}
function toUndefinedNumber(val:any){
  if (val === null || val === undefined || val === '') {
    return undefined;
  }
  return val+"";
}


export const PromotionSchema = z
  .object({
    titre: z
      .string()
      .min(5, 'Titre trop court (5 caractères minimum)')
      .max(150),

    taux: z
      .union([z.number(), z.string(), z.null(), z.undefined()])
      .transform(toUndefined)
      .refine(val => !isNaN(val), { message: "Taux invalide (nombre requis)" })
      .pipe(z.number().min(1, "Le taux doit être d'au moins 1%").max(100, "Le taux ne peut pas dépasser 100%").optional()),

    prixInitial:
      z.preprocess(
        (val)=> {return toUndefinedNumber(val)},
        z
        .string().trim()
        .refine(val => val && /^-?\d+(\.\d+)?$/.test(val), {
          message: 'Format du prix invalide',
        })
        .transform(Number)
        .refine(val => val >= 0, { message: 'Le prix doit être supérieur à zéro' })
        .optional()
    ),
    // z
    //   .union([z.number(), z.string(), z.null(), z.undefined()])
    //   .transform( toUndefinedForNumberOptional)
    //   .refine(val => val==undefined || !isNaN(val), { message: "prix invalide (nombre requis)" })
    //   .pipe(z.number().positive("Le prix doit être supérieur à 0").optional()),

    prixReduit:      z.preprocess(
    (val)=> {return toUndefinedNumber(val)},
    z
    .string().trim()
    .refine(val => val && /^-?\d+(\.\d+)?$/.test(val), {
      message: 'Format du prix invalide',
    })
    .transform(Number)
    .refine(val => val >= 0, { message: 'Le prix doit être supérieur à zéro' })
    .optional()),
    // z
    //   .union([z.number(), z.string(), z.null(), z.undefined()])
    //   .transform( toUndefinedForNumberOptional)
    //   .refine(val => val==undefined || !isNaN(val), { message: "prix invalide (nombre requis)" })
    //   .pipe(z.number().positive("Le prix réduit doit être supérieur à 0").optional()),

    description: z
      .string()
      .min(5, 'Description obligatoire'),

    dateDebut: z.string().min(1, 'Date début obligatoire'),

    // On garde dateFin simple ici car la comparaison nécessite l'objet entier
    dateFin: z.string().min(1, 'Date fin obligatoire'),

    image: z.any()
      .transform(toUndefined)
      .pipe(
        z.instanceof(File)
          .refine(file => ACCEPTED_TYPES.includes(file.type), 'Format invalide (jpg/jpeg/png seulement)')
          .refine(file => file.size <= MAX_FILE_SIZE, 'Taille maximale : 1MB')
          .optional()
      ),
  })
  .superRefine((data, ctx) => {
    if (data.dateDebut && data.dateFin) {
      if (new Date(data.dateFin) < new Date(data.dateDebut)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['dateFin'],
          message: 'La date de fin doit être après la date de début',
        });
      }
    }

    if (data.prixInitial) {
      if (!data.taux && !data.prixReduit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['taux'],
          message: 'Indiquez un taux ou un prix réduit',
        });
      }

      if (data.prixReduit && data.prixReduit >= data.prixInitial) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['prixReduit'],
          message: 'Le prix réduit doit être inférieur au prix initial',
        });
      }
    }
  });
