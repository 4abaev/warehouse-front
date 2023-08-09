import { Box, Button, IconButton, Input, InputGroup, InputRightElement, Modal, ModalContent, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import CreateProductForm from "../../../components/product/createForm";
import { useActions, useAppDispatch, useAppSelector } from "../../../state/store";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrent } from "../../../state/products/slice";
import styles from './index.module.scss'

const ProductsPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getProducts, deleteProduct } = useActions()
    const { products, isSuccess } = useAppSelector((state) => state.products)
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setinputValue] = useState("");

    const navigate = useNavigate()

    const filteredProducts = products.filter(product =>
        product.articul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const dispatch = useAppDispatch()

    const handleEdit = (product: Product) => {
        dispatch(setCurrent(product))
        navigate("/products/edit")
    }

    useEffect(() => {
        !products.length && !isSuccess && getProducts()
    }, [getProducts, products, isSuccess])

    const handleDelete = async (product: Product) => {
        deleteProduct({ id: product.id })
    }

    return (
        <>
            <Box display={"flex"} gap={5} alignItems={"center"} w={1000} justifyContent={"center"}>
                <Button colorScheme="facebook" onClick={onOpen} size={"md"}>Добавить</Button>
                <InputGroup w={500} size={"lg"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} >
                    <Input placeholder='Введите артикул или название' size={"lg"} borderRadius={25} value={inputValue} onChange={(e) => setinputValue(e.target.value)} />
                    <InputRightElement onClick={() => setSearchQuery(inputValue)}>
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
                    <Thead >
                        <Tr >
                            <Th w={100}></Th>
                            <Th w={150}>Изображение</Th>
                            <Th w={100}>Бренд</Th>
                            <Th w={100}>Артикул</Th>
                            <Th width={500}>Описание</Th>
                            <Th width={100}> </Th>
                        </Tr>
                    </Thead>
                    <Tbody transition={"0.3s"} >
                        {filteredProducts.map((product) => (
                            <Tr key={product.id}>
                                <Td width={100} textAlign={"center"}>
                                    <IconButton
                                        colorScheme='blue'
                                        aria-label='Edit'
                                        borderRadius={25}
                                        icon={<EditIcon />}
                                        onClick={() => handleEdit(product)}
                                    />
                                </Td>
                                <Td width={150} className={styles.imageContainer}><img className={styles.image} src={`${process.env.REACT_APP_DOMAIN}/${product.picture}`} alt="product" /></Td>
                                <Td width={100}> {product.brand}</Td>
                                <Td width={100}> {product.articul}</Td>
                                <Td minWidth={300} maxWidth={300} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}> {product.description}</Td>
                                <Td width={100} textAlign={"center"}>
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(product)
                                        }}
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