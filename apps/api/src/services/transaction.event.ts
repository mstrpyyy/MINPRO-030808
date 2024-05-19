import db from "@/helpers/db";
import { QueryError } from "mysql2";

export const createEvent = (data: { name: string; expireAt: string; orderId: number }) => {
    console.log(data);
    const { name, expireAt, orderId } = data;

    const query = `
    CREATE EVENT ${name}
    ON SCHEDULE AT '${expireAt}'
    DO
    BEGIN
        DECLARE order_status VARCHAR(20);
        DECLARE point_id INT;
        DECLARE use_referral BOOLEAN;
        DECLARE user_id INT;
        DECLARE available_tickets INT;
        DECLARE event_id INT;
        DECLARE qty INT;
        
        SELECT 
            status,
            pointId,
            useReferral,
            userId,
            eventId,
            quantity
        INTO 
            order_status, 
            point_id, 
            use_referral, 
            user_id, 
            event_id, 
            qty
        FROM min_pro.transaction
        WHERE id = ${orderId};

        IF order_status = 'WaitingPayment' THEN
            UPDATE min_pro.transaction
            SET status = 'Cancelled'
            WHERE id = ${orderId};

            IF point_id IS NOT NULL THEN
                UPDATE min_pro.pointUser
                SET isRedeem = false,
                    transactionId = NULL
                WHERE id = point_id;
            END IF;

            IF use_referral IS TRUE THEN
                UPDATE min_pro.user
                SET isRedeem = false
                WHERE id = user_id;
            END IF;

            SELECT 
                availableTickets INTO available_tickets
            FROM min_pro.event
            WHERE id = event_id;

            UPDATE min_pro.event
            SET availableTickets = available_tickets + qty
            WHERE id = event_id;

        END IF;
    END;
    `;

    db.query(query, (err: QueryError, result: any) => {
        if (err) {
            console.log(err);
            throw new Error('SQL create event failed');
        }
        return 'SQL create event success';
    });
}           
