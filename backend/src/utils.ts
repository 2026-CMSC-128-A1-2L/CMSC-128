import mongoose, { type QueryFilter } from 'mongoose';

type Range<T> = {
  min: T;
  max: T;
};

export function buildQuery<T>(
  args: Partial<
    Record<
      keyof T,
      number | string | boolean | mongoose.Types.ObjectId | undefined | Partial<Range<any>>
    >
  >,
): QueryFilter<T> {
  const query: QueryFilter<T> = {};

  for (const k of Object.keys(args)) {
    const kk = k as keyof T;
    const key = k as keyof QueryFilter<T>;
    if (args[kk] === undefined) continue;

    if (args[kk] instanceof mongoose.Types.ObjectId) {
      query[key] = args[kk] as any;
    } else if (typeof args[kk] === 'object') {
      if (args[kk]) {
        query[key] = {} as any;
        if (args[kk].min) {
          query[key].$gte = args[kk].min;
        }
        if (args[kk].max) {
          query[key].lt = args[kk].max;
        }
      }
    } else {
      query[key] = args[kk] as any;
    }
  }

  return query;
}
