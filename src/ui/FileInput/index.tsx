import { useCallback } from "react";
import styles from "./index.module.scss";
import { useDropzone } from "react-dropzone";

type FileInputType = {
    label: string;
    name: string;
    errors: any;
    selectedFile: File | null;
    setSelectedFile: any;
};

export function FileInput({ name, label, errors, selectedFile, setSelectedFile }: FileInputType): JSX.Element {
    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        setSelectedFile(acceptedFiles[0]);
    }, [setSelectedFile])
    const { getRootProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/*': []
        }
    });
    return (
        <div className={styles.input_container} {...getRootProps()}>
            <label>{label}</label>
            {isDragActive ?
                <label className={styles.upload2} >
                    Перенесите файл сюда
                </label>
                :
                <label className={styles.upload} >
                    Загрузить файл
                </label>}
            <div >


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
