import { z } from 'zod';

export const checkResultEnum = z.enum(['SUCCESS', 'FAIL']);

export const singleRuleScheme = z.object({
  name: z.string(),
  status: checkResultEnum.transform((v) => v === 'SUCCESS'),
});

export const singleMutantScheme = z.object({
  id: z.string(),
  description: z.string().optional(),
  diff: z.string().optional(),
  link: z.string().optional(),
  name: z.string(),
  rules: z.array(singleRuleScheme),
});

export const mutantResultsScheme = z
  .array(singleMutantScheme)
  .transform((v) => v.filter((v) => v.name !== 'Original'));

export type MutantResults = z.infer<typeof mutantResultsScheme>;
