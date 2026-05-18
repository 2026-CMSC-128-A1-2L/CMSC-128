import type { CSSProperties, FunctionComponent, ReactNode } from 'react';

const mergeClassNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(' ');

const skeletonItems = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => ({ id: `${prefix}-${index}`, index }));

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export const SkeletonBlock: FunctionComponent<SkeletonProps> = ({ className, style }) => (
  <div
    aria-hidden="true"
    style={style}
    className={mergeClassNames(
      'animate-pulse rounded-lg bg-[#e8f0ef] dark:bg-[#242928]',
      className,
    )}
  />
);

export const TableSkeletonRows: FunctionComponent<{
  rows?: number;
  columns: number;
  actionColumn?: boolean;
}> = ({ rows = 6, columns, actionColumn = false }) => (
  <>
    {skeletonItems('row', rows).map((row) => (
      <tr
        key={row.id}
        className="border-b border-[#f0f0f0] bg-white dark:border-[#303331] dark:bg-[#141515]"
      >
        {skeletonItems(`${row.id}-column`, columns).map((column) => (
          <td key={column.id} className="px-6 py-4">
            <SkeletonBlock
              className={mergeClassNames(
                'h-5',
                actionColumn && column.index === columns - 1
                  ? 'w-20 rounded-md'
                  : column.index === 0
                    ? 'w-36'
                    : column.index === columns - 2
                      ? 'w-24 rounded-full'
                      : 'w-full max-w-[220px]',
              )}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export const CardGridSkeleton: FunctionComponent<{
  cards?: number;
  className?: string;
  cardClassName?: string;
  children?: ReactNode;
}> = ({ cards = 6, className, cardClassName, children }) => (
  <div
    className={mergeClassNames(
      'grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3',
      className,
    )}
  >
    {skeletonItems('card', cards).map((card) => (
      <div
        key={card.id}
        className={mergeClassNames(
          'rounded-xl border border-[#f0f0f0] bg-white p-4 dark:border-[#303331] dark:bg-[#141515]',
          cardClassName,
        )}
      >
        {children ?? (
          <div className="flex items-center gap-4">
            <SkeletonBlock className="h-14 w-14 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-3">
              <SkeletonBlock className="h-4 w-2/3" />
              <SkeletonBlock className="h-3 w-1/2" />
              <SkeletonBlock className="h-3 w-3/4" />
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

export const SettingsPanelSkeleton: FunctionComponent = () => (
  <div className="flex w-full flex-col gap-8">
    <SkeletonBlock className="h-8 w-56" />
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      {skeletonItems('setting', 4).map((item) => (
        <div key={item.id} className="flex flex-col items-start gap-3">
          <SkeletonBlock className="h-4 w-36" />
          <SkeletonBlock className="h-5 w-3/4" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
      ))}
    </div>
    <SkeletonBlock className="h-px w-full rounded-full" />
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <SkeletonBlock className="h-28 w-full rounded-2xl" />
      <SkeletonBlock className="h-28 w-full rounded-2xl" />
    </div>
  </div>
);
