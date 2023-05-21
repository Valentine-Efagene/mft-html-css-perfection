interface IOPtion {
  value: string | null;
  title: string | number | null;
}

interface tab {
  to: string;
  title: string;
}

type IOptionValue = string | number | undefined | null;

export type { tab, IOPtion, IOptionValue };
