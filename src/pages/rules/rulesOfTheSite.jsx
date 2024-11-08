import Footer from "../../components/footer";
import Header from "../../components/header";

export default function rulesOfTheSite() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center w-full bg-main-black">
        <div className="w-full max-w-[1196px] px-10 min-h-screen mt-[130px]">
          <h1 className="text-main-white text-[clamp(20px,3vw,36px)] font-semibold">
            Правила пользования сайтом
          </h1>
          <h2 className="text-main-white text-[clamp(16px,3vw,24px)] font-semibold mt-[40px]">
            ITBRAT - платформа для поиска команд и проектов в сфере IT.
          </h2>
          <div>
            <ul className="flex flex-col gap-5">
              <h2 className="text-main-white text-[clamp(16px,3vw,24px)] font-semibold mt-[41px]">
                1. Общие положения
              </h2>

              <li className="text-second-color">
                1.1 Эти правила регулируют отношения между Администрацией сайта
                ITBRAT (далее - Администрация) и Пользователями сайта (далее -
                Пользователи).
              </li>
              <li className="text-second-color">
                1.2 Регистрация на сайте и использование его сервисов
                подразумевает полное и безоговорочное согласие Пользователя с
                данными правилами.
              </li>
              <li className="text-second-color">
                1.3 Администрация имеет право вносить изменения в правила в
                любое время без предварительного уведомления.
              </li>
              <li className="text-second-color">
                1.4 Пользователь обязуется следить за обновлениями правил и
                самостоятельно ознакамливаться с ними.
              </li>
              <li className="text-second-color">
                <h2 className="text-main-white text-[clamp(16px,3vw,20px)] font-semibold mt-[55px]">
                  2. Регистрация и аккаунт
                </h2>
              </li>
              <li className="text-second-color">
                2.1 Регистрация на сайте обязательна для использования всех
                сервисов.
              </li>
              <li className="text-second-color">
                2.2 Пользователь несет ответственность за сохранность своих
                регистрационных данных (логин и пароль).
              </li>

              <li className="text-second-color">
                2.3 Пользователю запрещается передавать свои регистрационные
                данные третьим лицам.
              </li>
              <li className="text-second-color">
                2.4 Пользователь несет полную ответственность за все действия,
                совершенные под его аккаунтом.
              </li>
              <li className="text-second-color">
                2.5 Администрация имеет право заблокировать аккаунт Пользователя
                без объяснения причин.
              </li>
              <li>
                <h2 className="text-main-white text-[clamp(16px,3vw,20px)] font-semibold mt-[55px]">
                  3. Публикация контента
                </h2>
              </li>
              <li className="text-second-color">
                3.1 Пользователь несет полную ответственность за контент,
                который он публикует на сайте.
              </li>
              <li className="text-second-color">
                3.2 Запрещается публиковать информацию, которая нарушает
                законодательство РФ, этические нормы, правила сайта.
              </li>
              <li className="text-second-color">
                3.3 Администрация оставляет за собой право удалять любой
                контент, который не соответствует правилам сайта.
              </li>
              <li className="text-second-color">
                <h2 className="text-main-white text-[clamp(16px,3vw,20px)] font-semibold mt-[55px]">
                  4. Проекты и команды
                </h2>
              </li>
              <li className="text-second-color">
                4.1 Пользователи могут создавать проекты или искать команды для
                работы.
              </li>
              <li className="text-second-color">
                4.2 Пользователь несет ответственность за достоверность
                информации о проекте или команде.
              </li>
              <li className="text-second-color">
                4.3 Администрация не несет ответственности за качество проектов
                и команд.{" "}
              </li>
              <li className="text-second-color">
                4.4 Пользователи сами выбирают друг друга для сотрудничества.{" "}
              </li>
              <li>
                <h2 className="text-main-white text-[clamp(16px,3vw,20px)] font-semibold mt-[55px]">
                  5. Принимая условия данных Правил, Пользователь подтверждает,
                  что ознакомился с ними и согласен с ними.
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
