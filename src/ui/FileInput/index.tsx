import { useState } from "react";

import styles from "./index.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

type FileInputType = {
    label: string;
    name: string;
    type: string;
    register: UseFormRegisterReturn<string>;
    errors: any;
    accept: string;
};

export function FileInput({ name, label, register, type, errors, accept }: FileInputType): JSX.Element {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function fileChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    }

    return (
        <div className={styles.input_container}>
            <label>{label}</label>
            <label className={styles.upload} htmlFor={name}>
                Загрузите файл
            </label>
            <div>
                <input
                    type={type}
                    accept={accept}
                    placeholder={label}
                    id={name}
                    {...register}
                    onInput={fileChangeHandler}
                />
                {selectedFile && (
                    <div>
                        <p>Название: {selectedFile.name}</p>
                        <p>Размер: {(selectedFile.size / 1e6).toFixed(2)} мб</p>
                    </div>
                )}
            </div>
            {errors[name] && <p className={styles.error_msg}>{errors[name].message as string}</p>}
        </div>
    );
}

export function FileInputControl({ name, label, register, type, errors, accept, selectedFile, fileChangeHandler }: FileInputType & {selectedFile: File | null, fileChangeHandler: any}): JSX.Element {


    return (
        <div className={styles.input_container}>
            <label>{label}</label>
            <label className={styles.upload} htmlFor={name}>
                Загрузите файл
            </label>
            <div>
                <input
                    type={type}
                    accept={accept}
                    placeholder={label}
                    id={name}
                    {...register}
                    onInput={fileChangeHandler}
                />
                {selectedFile && (
                    <div>
                        <p>Название: {selectedFile.name}</p>
                        <p>Размер: {(selectedFile.size / 1e6).toFixed(2)} мб</p>
                    </div>
                )}
            </div>
            {errors[name] && <p className={styles.error_msg}>{errors[name].message as string}</p>}
        </div>
    );
}
