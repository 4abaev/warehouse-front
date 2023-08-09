import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement, IconButton, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Box, Heading, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useActions, useAppSelector } from "../../../state/store";
import styles from './index.module.scss'
import Order from "../../../components/order";

const OrdersPage = () => {
    const { getProducts, deleteProduct, getOrders } = useActions()
    const { products, isSuccess } = useAppSelector((state) => state.products)
    const { orders, isOrderSucces } = useAppSelector((state) => state.orders)
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setinputValue] = useState("");

    const filteredProducts = products.filter(product =>
        product.articul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        !products.length && !isSuccess && getProducts()
        !orders.length && !isOrderSucces && getOrders()
    }, [getProducts, products, isSuccess, getOrders, orders, isOrderSucces])

    const handleAdd = async (product: Product) => {
        deleteProduct({ id: product.id })
    }

    return (
        <>
            <Box display={"flex"} gap={5} alignItems={"center"} w={1000} justifyContent={"center"}>
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
            <Box display={"flex"} gap={10} marginTop={10}>
                <TableContainer marginBottom={10}>
                    <Heading className={styles.contentHeader}>Каталог</Heading>
                    <Table variant='simple'>
                        <TableCaption>Таблица товаров</TableCaption>
                        <Thead >
                            <Tr >
                                <Th w={150} >Изображение</Th>
                                <Th w={100}>Бренд</Th>
                                <Th w={100}>Артикул</Th>
                                <Th width={100}>Описание</Th>
                                <Th width={100}> </Th>
                            </Tr>
                        </Thead>
                        <Tbody transition={"0.3s"} >
                            {filteredProducts.map((product) => (
                                <Tr key={product.id}>
                                    <Td width={150} className={styles.imageContainer}><img className={styles.image} src={`${process.env.REACT_APP_DOMAIN}/${product.picture}`} alt="product" /></Td>
                                    <Td width={100}> {product.brand}</Td>
                                    <Td width={100}> {product.articul}</Td>
                                    <Td minWidth={100} maxWidth={100} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}> {product.description}</Td>
                                    <Td width={100} textAlign={"center"}>
                                        <Button
                                            onClick={() => {
                                                handleAdd(product)
                                            }}
                                            colorScheme='blue'
                                            aria-label='Search database'
                                            borderRadius={25}
                                        >
                                            Добавить
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                            
                        </Tbody>
                    </Table>
                </TableContainer>
                <Box>
                    <Heading className={styles.contentHeader}>Каталог</Heading>
                    {orders.map((order) => (
                        <Order key={order.id} order={order} />
                    ))}
                </Box>
            </Box>


        </>
    );
}

export default OrdersPage;