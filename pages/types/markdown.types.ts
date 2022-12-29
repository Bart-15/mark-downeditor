export type TValue = {
    value: string;
    setValue: (value: string) => void;
};

export type TModal = {
    markdown: string;
    title: string;
    setTitle: (value: string) => void;
    setOpen: (value: boolean) => void;
};
