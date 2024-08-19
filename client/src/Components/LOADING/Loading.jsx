import React from 'react'
import style from "./loadingStyle.module.scss";


const Loading = () => {
  return (
    <section className={style.main}>
        <main className={style.container}>
            <section className={style.content}>
                <h3>Loading</h3>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </section>
        </main>
    </section>
  )
}

export default Loading