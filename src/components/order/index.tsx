import { Box, Heading } from "@chakra-ui/react";
import { currentStatus, formatDateAndTime } from "../../libs";
import styles from './index.module.scss'
const Order = ({ order }: { order: Order }) => {
    return (
        <Box className={styles.box}>
            <div className={styles.boxHeader}>
                <div>Создан: {formatDateAndTime(order.createdAt)}</div>
                <div>Статус: {currentStatus(order.status)} </div>
            </div>
        </Box>
    );
}

export default Order;