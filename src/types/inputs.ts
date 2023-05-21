interface IOPtion {
  value: string | null;
  title: string | number | null;
}

interface tab {
  to: string;
  title: string;
}

type IOptionValue = string | number;

export type { tab, IOPtion, IOptionValue };
