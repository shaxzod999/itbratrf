import Footer from "../../components/footer";
import Header from "../../components/header";

export default function userAgreement() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center w-full bg-main-black">
        <div className="w-full max-w-[1196px] px-10 min-h-screen mt-[130px]">
          <h1 className="text-main-white text-[clamp(20px,3vw,36px)] font-semibold">
            Пользовательское соглашение
          </h1>
          <div>
            <ul className="flex flex-col gap-5">
              <h2 className="text-main-white text-[clamp(16px,3vw,24px)] font-semibold mt-[52px]">
                1. Общие положения Пользовательского соглашения
              </h2>

              <li className="text-second-color">
                1.1. В настоящем документе и вытекающих или связанным с ним
                отношениях Сторон применяются следующие термины и определения:
              </li>
              <li className="text-second-color">
                а) Платформа — программно-аппаратные средства, интегрированные с
                Сайтом Администрации;
              </li>
              <li className="text-second-color">
                б) Пользователь — дееспособное физическое лицо, присоединившееся
                к настоящему Соглашению в собственном интересе либо выступающее
                от имени и в интересах представляемого им юридического лица.
              </li>
              <li className="text-second-color">
                в) Сайт Администрации/ Сайт — интернет-сайты, размещенные в
                домене ________.ru и его поддоменах.
              </li>
              <li className="text-second-color">
                г) Сервис — комплекс услуг и лицензия, предоставляемые
                Пользователю с использованием Платформы.
              </li>
              <li className="text-second-color">
                д) Соглашение - настоящее соглашение со всеми дополнениями и
                изменениями.
              </li>
              <li className="text-second-color">
                1.2. Использование вами Сервиса любым способом и в любой форме в
                пределах его объявленных функциональных возможностей, включая:
              </li>

              <ul className="list-disc px-7">
                <li className="text-second-color">
                  просмотр размещенных на Сайте материалов;
                </li>
                <li className="text-second-color">
                  регистрация и/или авторизация на Сайте,
                </li>
                <li className="text-second-color">
                  размещение или отображение на Сайте любых материалов, включая
                  но не ограничиваясь такими как: тексты, гипертекстовые ссылки,
                  изображения, сведения и/или иная информация,
                </li>
              </ul>

              <li className="text-second-color">
                создает договор на условиях настоящего Соглашения в соответствии
                с положениями ст.437 и 438 Гражданского кодекса Российской
                Федерации.
              </li>
              <li className="text-second-color">
                1.3. Воспользовавшись любой из указанных выше возможностей по
                использованию Сервиса вы подтверждаете, что:
              </li>
              <li className="text-second-color">
                а) Ознакомились с условиями настоящего Соглашения в полном
                объеме до начала использования Сервиса.
              </li>
              <li className="text-second-color">
                б) Принимаете все условия настоящего Соглашения в полном объеме
                без каких-либо изъятий и ограничений с вашей стороны и
                обязуетесь их соблюдать или прекратить использование Сервиса.
                Если вы не согласны с условиями настоящего Соглашения или не
                имеете права на заключение договора на их основе, вам следует
                незамедлительно прекратить любое использование Сервиса.
              </li>
              <li className="text-second-color">
                в) Соглашение (в том числе любая из его частей) может быть
                изменено Администрацией без какого-либо специального
                уведомления. Новая редакция Соглашения вступает в силу с момента
                ее размещения на Сайте Администрации либо доведения до сведения
                Пользователя в иной удобной форме, если иное не предусмотрено
                новой редакцией Соглашения.
              </li>
              <li>
                <h2 className="text-main-white text-[clamp(16px,3vw,24px)] font-semibold mt-[52px]">
                  2. Условия пользования по Соглашению
                </h2>
              </li>
              <li className="text-second-color">
                2.1. Использование функциональных возможностей Сервиса
                допускается только после прохождения Пользователем регистрации и
                авторизации на Сайте в соответствии с установленной
                Администрацией процедурой.
              </li>
              <li className="text-second-color">
                2.2. Технические, организационные и коммерческие условия
                использования Сервиса, в том числе его функциональных
                возможностей доводятся до сведения Пользователей путем
                отдельного размещения на Сайте или путем нотификации
                Пользователей.
              </li>
              <li className="text-second-color">
                2.3. Выбранные Пользователем логин и пароль являются необходимой
                и достаточной информацией для доступа Пользователя на Сайт.
                Пользователь не имеет права передавать свои логин и пароль
                третьим лицам, несет полную ответственность за их сохранность,
                самостоятельно выбирая способ их хранения.
              </li>
              <li className="text-second-color"></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
