<?php

    //В переменную $token нужно вставить токен, который нам прислал @botFather
    $token = "1670273806:AAED917Gd7nWkgDDq_TKv2GRZFe9ens1W8w";
    $new_url_true = '../massege_true.html';
    $new_url_false = '../massege_false.html';

    //Сюда вставляем chat_id
    $chat_id = "538615330";
    // Проверка на наличие ссылки
    $validation = "/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i";

    //Определяем переменные для передачи данных из нашей формы
    if ($_POST['act'] == 'order') {
        $site = 'npf-monolit.ru';
        $email = ($_POST['email']);
        $message = ($_POST['message']);

    //Собираем в массив то, что будет передаваться боту
        $arr = array(
            'Site:' => $site,
            'E-mail: ' => $email,
            'Сообщение: ' => $message
        );

    //Настраиваем внешний вид сообщения в телеграме
        foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b> ".$value."%0A";
        };

    
    // если ссылок нет продолжаем отправку, если нет заканчиваем
    if((bool)preg_match($validation, $message) === false) {

        //Передаем данные боту
        $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
        header('Location: '.$new_url);

    } else {
        echo 'There is a link in the post';
    }
    


    //Выводим сообщение об успешной отправке

        if ($sendToTelegram) {
            // echo "Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.";
            header('Location: ' . $new_url_true);
        }

    //А здесь сообщение об ошибке при отправке
        else {
            // echo "Что-то пошло не так, позвоните нам пока мы чиним!";
            header('Location: ' . $new_url_false);
        }
    }


?>