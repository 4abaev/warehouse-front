import { Box, Button, IconButton, Input, InputGroup, InputRightElement, Modal, ModalContent, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import CreateProductForm from "../../components/product/createForm";
import { useActions, useAppSelector } from "../../state/store";
import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import EditProductForm from "../../components/product/editForm";
import { CustomEditModal } from "../../components/modal";
// import { CustomEditModal } from "../../components/modal";

const ProductsPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getProducts } = useActions()
    
    const { products } = useAppSelector((state) => state.products)

    useEffect(() => {
        if (!products.length) {
            getProducts()
        }
    }, [getProducts, products])

    return (
        <>
            <Box display={"flex"} gap={5} alignItems={"center"} w={1000} justifyContent={"center"}>
                <Button colorScheme="facebook" onClick={onOpen} size={"md"} >Добавить</Button>
                <InputGroup w={500} size={"lg"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} >
                    <Input placeholder='Введите артикул или название' size={"lg"} />
                    <InputRightElement >
                        <IconButton
                            colorScheme='blue'
                            aria-label='Search database'
                            borderRadius={25}
                            icon={<SearchIcon />}
                        />
                    </InputRightElement>
                </InputGroup>
            </Box>
            <TableContainer marginTop={10} marginBottom={10}>
                <Table variant='simple'>
                    <TableCaption>Таблица товаров</TableCaption>
                    <Thead>
                        <Tr>
                            <Th w={50}></Th>
                            <Th>Изображение</Th>
                            <Th>Бренд</Th>
                            <Th>Артикул</Th>
                            <Th width={400}></Th>
                            <Th>

                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map((product) => (
                            <Tr key={product.id}>
                                <Td>
                                    <CustomEditModal>
                                        <EditProductForm product={product} />
                                    </CustomEditModal>
                                </Td>
                                <Td ><img style={{ borderRadius: "10px" }} src={`http://localhost:4000/${product.picture}`} alt="product" width={75} /></Td>
                                <Td>{product.brand}</Td>
                                <Td>{product.articul}</Td>
                                <Td>{product.description}</Td>
                                <Td></Td>
                                <Td>
                                    <IconButton
                                        colorScheme='orange'
                                        aria-label='Search database'
                                        borderRadius={25}
                                        icon={<DeleteIcon />}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={5}>
                    <CreateProductForm onClose={onClose} />
                </ModalContent>
            </Modal>


        </>
    )
}

export default ProductsPage;