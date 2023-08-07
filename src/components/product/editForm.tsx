import { Box, Button, Editable, EditableInput, EditablePreview, EditableTextarea, Heading, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FileInput } from "../../ui/FileInput";
import { useActions } from "../../state/store";
import styles from './form.module.scss'

const EditProductForm = ({ product }: { product: Product }) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: "onChange" })

    const { createProduct } = useActions()

    const handleSave = async (data: any) => {
        const formData = new FormData()
        formData.append("description", data.description)
        formData.append("articul", data.articul)
        formData.append("category", data.category)
        formData.append("brand", data.brand)
        formData.append("picture", data.picture[0])
        createProduct(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleSave)} >
            <Heading textAlign={"center"} marginBottom={8}>Добавление товара</Heading>
            <Stack spacing={4}>
                <label>Описание</label>
                <Editable defaultValue={product.description} >
                    <EditablePreview className={styles.input} />
                    <EditableTextarea
                        className={styles.input}
                        autoComplete="false"
                        {...register("description")}
                    />
                </Editable>
                <label>Артикул</label>
                <Editable defaultValue={product.articul} >
                    <EditablePreview className={styles.input} />
                    <EditableInput
                        className={styles.input}
                        autoComplete="false"
                        {...register("articul")}
                    />
                </Editable>
                <label>Категория</label>
                <Editable defaultValue={product.category} >
                    <EditablePreview className={styles.input} />
                    <EditableInput
                        className={styles.input}
                        autoComplete="false"
                        {...register("category")}
                    />
                </Editable>
                <label>Бренд</label>
                <Editable defaultValue={product.brand} >
                    <EditablePreview className={styles.input} />
                    <EditableInput
                        className={styles.input}
                        autoComplete="false"
                        {...register("brand")}
                    />
                </Editable>

                <FileInput
                    name="picture"
                    label="Изменить изображение"
                    accept="image/*"
                    errors={errors}
                    type="file"
                    register={register("picture")}
                />
            </Stack>

        </form>
    );
}

export default EditProductForm;