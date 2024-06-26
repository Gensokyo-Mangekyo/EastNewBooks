import Header from "../components/UI/Header/Header";
import GlobalService from "../API/GlobalService";
import Nav from "../components/UI/Nav/Nav";
import Soft from "../images/Soft.png"

export default function Info() {


return (<div>
        <Header/>
        <Nav Navigate = {GlobalService.Navigation} />
        <div className="InfoMain">
            <h1>О нас</h1>
            <h4>
        Мы являемся одним из звеньев во всемирной системе сбыта компьютерной продукции от производителя до конечного потребителя.
        Мы включены в реестр аккредитованных организаций, осуществляющих деятельность в области информационных технологий (Номер в реестре аккредитованных организаций: 32644, выписка из реестра, решение о прохождении ежегодной процедуры подтверждения государственной аккредитации).
        Дистрибутор это больше, чем просто оптовый продавец, ставящий целью отношения на уровне "купил партию товара - продал партию товара". С большинством поставщиков установлены совсем иные – долгосрочные отношения.
        Мы заинтересованы строить взаимодействие на долгосрочной и многоуровневой основе и готовы сделать всё зависящее для развития бизнеса партнеров в областях, которыми занимаемся. Формы этого сотрудничества могут быть самыми разнообразными. Начиная от помощи в участии в тендерах, ценообразования и консультаций по выбору оборудования, и заканчивая сотрудничеством в организации семинаров для конечных пользователей.
        У нас есть определенные знания и опыт. У нас есть информация, которая зачастую может быть вам полезна. Мы готовы делиться этим с партнерами.
        Очевидно, что вас связывают весьма серьезные отношения с ключевыми клиентами. Что ваши инженеры и специалисты квалифицированы, а что-то наверняка знают лучше нас. Практика показывает, что эффективность и взаимная выгода от сотрудничества существенно возрастает, когда связь с дилерами не сводится к отношениям "менеджер по продажам дистрибутора – менеджер по закупкам дилера". Убеждены, что также можем быть полезны вашим сотрудникам, отвечающим за техническую политику, инженерам, менеджерам проектов, менеджерам по маркетингу. Если вопрос требует участия руководителей нашей компании, его тоже можно решить оперативно.
</h4>
    <img src={Soft} />
        </div>

  </div>)
}