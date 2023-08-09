import { Box, IconButton, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { currentStatus, formatDateAndTime } from "../../libs";
import styles from './index.module.scss'
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
const Order = ({ order }: { order: Order }) => {
    return (
        <Box className={styles.box}>
            <div className={styles.boxHeader}>
                <div>Создан: {formatDateAndTime(order.createdAt)}</div>
                <div>Статус: {currentStatus(order.status)} </div>
            </div>
            <div className={styles.boxBody}>
                {order.products.map((product) => (
                    <div className={styles.grid} key={product.id}>
                        <div className={styles.imageContainer}><img className={styles.image} src={`${process.env.REACT_APP_DOMAIN}/${product.picture}`} alt="product" /></div>
                        <div><Text noOfLines={2}> {product.brand}</Text></div>
                        <div><Text noOfLines={2}> {product.articul}</Text></div>
                        <div><Text noOfLines={2}> {product.description}</Text></div>
                        <div>
                            <IconButton
                                background={"none"}
                                color={"red"}
                                aria-label='Search database'
                                borderRadius={25}
                                icon={<CloseIcon />}
                            />
                        </div>
                    </div>
                ))}


            </div>
        </Box>
    );
}

export default Order;