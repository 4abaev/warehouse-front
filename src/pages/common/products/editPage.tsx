import { Box, Button, Container, Editable, EditableInput, EditablePreview, EditableTextarea, Heading, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FileInput } from "../../../ui/FileInput";
import { useActions, useAppDispatch, useAppSelector } from "../../../state/store";
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { setSuccesFalse } from "../../../state/products/slice";

const EditProductPage = () => {

    const onDrop = useCallback((acceptedFiles: Array<File>) => {

        setSelectedFile(acceptedFiles[0]);
        console.log(acceptedFiles[0]);
        
    }, [])

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: "onChange" })

    const { currentProduct, isSuccess } = useAppSelector((state) => state.products)
    const { updateProduct, } = useActions()
    const navigate = useNavigate()

    useEffect(() => {
        isSuccess && navigate("/products")
    }, [isSuccess, navigate])

    const dispatch = useAppDispatch()


    const handleSave = (data: any) => {
        const formData = new FormData()
        formData.append("description", data.description)
        formData.append("articul", data.articul)
        formData.append("category", data.category)
        formData.append("brand", data.brand)
        selectedFile && formData.append("picture", selectedFile)
        updateProduct({ formData, id: currentProduct?.id })
        isSuccess && navigate("/products")
        dispatch(setSuccesFalse())
    }

    return (
        <Container display={"flex"} justifyContent={"center"} gap={150} maxW='5xl'>
            <Box className={styles.image2Container} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <img className={styles.image2} src={selectedFile ? URL.createObjectURL(selectedFile) : `${process.env.REACT_APP_DOMAIN}/${currentProduct?.picture}`} alt="product" />
            </Box>
            <form onSubmit={handleSubmit(handleSave)} >
                <Heading textAlign={"center"} marginBottom={8}>Изменение товара</Heading>
                <Stack spacing={4}>
                    <label>Описание</label>
                    <Editable defaultValue={currentProduct?.description} >
                        <EditablePreview className={styles.input} />
                        <EditableTextarea
                            className={styles.input}
                            autoComplete="false"
                            {...register("description")}
                        />
                    </Editable>
                    <label>Артикул</label>
                    <Editable defaultValue={currentProduct?.articul} >
                        <EditablePreview className={styles.input} />
                        <EditableInput
                            className={styles.input}
                            autoComplete="false"
                            {...register("articul")}
                        />
                    </Editable>
                    <label>Категория</label>
                    <Editable defaultValue={currentProduct?.category} >
                        <EditablePreview className={styles.input} />
                        <EditableInput
                            className={styles.input}
                            autoComplete="false"
                            {...register("category")}
                        />
                    </Editable>
                    <label>Бренд</label>
                    <Editable defaultValue={currentProduct?.brand} >
                        <EditablePreview className={styles.input} />
                        <EditableInput
                            className={styles.input}
                            autoComplete="false"
                            {...register("brand")}
                        />
                    </Editable>

                    <FileInput
                        name="picture"
                        label="Изображение"
                        errors={errors}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                </Stack>
                <Box display="flex" marginTop={5} justifyContent="space-between">
                    <Button type="submit" colorScheme="blue">Сохранить</Button>
                    <Button onClick={() => navigate("/products")} colorScheme="facebook">Отмена</Button>
                </Box>
            </form>
        </Container>
    );
}

export default EditProductPage;