import badgeStarSource from "assets/badge_star.png"
import Image, {StaticImageData} from "next/image"

import styles from "./index.module.scss"

interface IBadge {
    title: string
    isLink?: boolean
    link?: string
}

const Badge = ({title, isLink = false, link = ""}: IBadge) => {
    return isLink ? (
        <a href={link} target="_blank" className={`${styles.badge} badge`}>
            <Image
                src={badgeStarSource as StaticImageData}
                alt="Star"
                className={styles.icon}
            />
            <span className={styles.title}>{title}</span>
        </a>
    ) : (
        <div className={`${styles.badge} badge`}>
            <Image
                src={badgeStarSource as StaticImageData}
                alt="Star"
                className={styles.icon}
            />
            <span className={styles.title}>{title}</span>
        </div>
    )
}

export default Badge
