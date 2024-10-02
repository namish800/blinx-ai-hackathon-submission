/***
 *
 * @file app/loading.tsx
 * @description Loader for Blinx.ai.
 * @author Satyam Mahajan
 * @organization KreativX
 * @since 21 Sep 2024
 *
 */

import styles from './loading.module.css';
const Loading = () => {
    return (
        <div className={styles['loading-container']}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
        </div>
    )
}

export default Loading;