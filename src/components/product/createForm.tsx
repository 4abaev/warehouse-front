import { Box, Button, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FileInput } from "../../ui/FileInput";
import { useActions } from "../../state/store";

const CreateProductForm = ({ onClose }: { onClose: any}) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: "onChange" })

    const { createProduct } = useActions()

    const handleCreate = async (data: any) => {
        const formData = new FormData()
        formData.append("description", data.description)
        formData.append("articul", data.articul)
        formData.append("category", data.category)
        formData.append("brand", data.brand)
        formData.append("picture", data.picture[0])
        createProduct(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <Heading textAlign={"center"} marginBottom={8}>Добавление товара</Heading>
            <Stack spacing={4}>
                <Textarea
                    placeholder='Описание'
                    autoComplete="false"
                    {...register("description")}
                />

                <Input
                    size="md"
                    placeholder='Артикул'
                    autoComplete="false"
                    {...register("articul")}
                />

                <Input
                    size="md"
                    placeholder='Категория'
                    autoComplete="false"
                    {...register("category")}
                />
                <Input
                    size="md"
                    placeholder='Бренд'
                    autoComplete="false"
                    {...register("brand")}
                />


                <FileInput
                    name="picture"
                    label="Изображение"
                    accept="image/*"
                    errors={errors}
                    type="file"
                    register={register("picture")}
                />
                <Box display="flex" justifyContent="space-between">
                    <Button type="submit" colorScheme="blue">Добавить</Button>
                    <Button onClick={() => onClose()} colorScheme="facebook">Отмена</Button>
                </Box>
            </Stack>
        </form>
    );
}

export default CreateProductForm;