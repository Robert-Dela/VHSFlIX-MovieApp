import Head from "next/head";
import Link from "next/link"
import styles from "../../styles/layout.module.css"
import {FaHome} from 'react-icons/fa'


export default function Layout  ({children, title="VHSFLIX"}) {
    
// Css Styling classnames
const { body, container, dashboard, side_nav, logo, main_content, 
    header, navigation_list, navigation_item, navigation_icon,
 

} = styles

    return (
        <div className={container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body className={body}>
            <div className={container}>
                    <div className={dashboard}>
                        <section  className={header}>
                            <div className={logo}>
                                VHSFLIX
                            </div>
                        </section>

                        <section className={side_nav}>
                            <div>
                                <ul className={navigation_list}>
                                        
                                    <Link href="/">
                                        <li className={navigation_item}>
                                            <FaHome className={navigation_icon}/> Dashboard
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </section>

                        <section className={main_content}>
                            {children}
                        </section>
                    </div>
                </div>
            </body>
        </div>
    )
}
