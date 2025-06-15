import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface Props {
    duration: number,
    children: ReactNode
}

 const MotionComponent: FC<Props> = ({duration, children}) =>{
    return (
        <motion.div initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} transition={{duration}}>
            {children}
        </motion.div> 
    )
}

export default MotionComponent;