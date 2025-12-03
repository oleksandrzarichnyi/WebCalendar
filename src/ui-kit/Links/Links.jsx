import styles from './Links.module.scss'

export default function Link({ link, text, variant }) {
  return (
    <a className={styles[`${variant}`]} href={link}>
      {text}
    </a>
  )
}