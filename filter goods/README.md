A. Отчет по товарам

Ограничение времени: 1 секунда
Ограничение памяти: 512Mb
Ввод: стандартный ввод или input.txt
Вывод: стандартный вывод или output.txt

Недавно в Выньдекс.рынке среди покупателей провели опрос — какие товары они считают наиболее «интересными» для себя. На выбор предлагалось 5различных вариантов фильтра:
«Наименование товара содержит подстроку в любом регистре» (внутренний ключ ‘NAME_CONTAINS’);
«Цена больше или равна чем» (внутренний ключ ‘PRICE_GREATER_THAN’);
«Цена меньше или равна чем» (внутренний ключ ‘PRICE_LESS_THAN’);
«Товар поступил в продажу не позднее» (внутренний ключ ‘DATE_BEFORE’);
«Товар поступил в продажу не ранее» (внутренний ключ ‘DATE_AFTER’);
По итогам опроса определились самые актуальные значения каждого из фильтров (по одному значению на фильтр).
Вам, как аналитику Выньдекс.Рынка, поставили задачу из имеющегося списка товаров выбрать все товары, удовлетворяющие актуальным значениям всех указанных фильтров.

##Формат ввода

Общее описание формата входных данных:
* Первая строка входных данных содержит список товаров в формате JSON.
* Следующие 5 трок имеют вид qi vi — фильтр и соответствующее ему актуальное значение.

Подробное описание формата списка товаров
Гарантии по формату JSON:
* нет запятых после последнего элемента массива;
* все имена полей и строки обернуты в двойные кавычки.

Обозначим количество товаров в списке через N. Гарантируется, что 0 ≤ N ≤ 1 000.
Каждый товар в списке содержит следующую информацию (порядок полей не является фиксированным):
* целое число id (0 ≤ id ≤ 2^31 − 1) — уникальный идентификатор. Гарантируется, что идентификаторы всех товаров попарно различны;
* строка name (1 ≤ |name| ≤ 100) — наименование. Гарантируется, что наименование содержит только строчные и заглавные латинские буквы, а так же пробел;
* целое число price (0 ≤ price ≤ 2^31 − 1) — цена;
* строка date в формате «dd.MM.yyyy» (01.01.1970 ≤ date ≤ 31.12.2070) — дата поступления в продажу.

Подробное описание формата фильтров
Гарантируется, что:
* все qi различны между собой;
* qi является строкой из множества (NAME_CONTAINS, PRICE_GREATER_THAN, PRICE_LESS_THAN, DATE_BEFORE, DATE_AFTER);
* в фильтре ‘NAME_CONTAINS’ vi представляет из себя строку (1 ≤ |vi| ≤ 100), содержащую только строчные и заглавные латинские буквы;
* в фильтрах ‘PRICE_GREATER_THAN’ и ‘PRICE_LESS_THAN’ vi представляет из себя целое число (0 ≤ vi ≤ 2^31 − 1);
* в фильтрах ‘DATE_BEFORE’ и ‘DATE_AFTER’ vi представляет из себя строку в формате «dd.MM.yyyy» (01.01.1970 ≤ vi ≤ 31.12.2070).

##Формат вывода

Выведите в формате JSON список товаров, удовлетворяющих всем указанным во входных данных фильтрам. Каждый товар должен быть выведен ровно один раз в отсортированном по возрастанию id порядке.
Выводить JSON допустимо как c дополнительными отступами и переводами строк, так и в одну строку.
Имена полей необходимо выводить в двойных кавычках.
НЕ допустимо выводить запятую после последнего поля объекта или последнего элемента массива.
Каждый товар должен содержать информацию, аналогичную информации из входных данных:
* целое число id — уникальный идентификатор;
* строка name — наименование;
* целое число price — цена;
* строка date в формате «dd.MM.yyyy» — дата поступления в продажу.

##Пример

Ввод
[{"id": 1, "name": "Asus notebook","price": 1564,"date": "23.09.2021"},{"id": 2, "name": "Earpods", "price": 2200, "date": "10.01.2022"},{"id": 3, "name": "Keyboard", "price": 2500, "date": "05.06.2020"}, {"id": 4, "name": "Dell notebook","price": 2300,"date": "23.09.2021"}]
NAME_CONTAINS notebook
PRICE_GREATER_THAN 2000
PRICE_LESS_THAN 2400
DATE_AFTER 12.09.2021
DATE_BEFORE 02.01.2022

Вывод
[{"id": 4, "name": "Dell notebook", "price": 2300, "date": "23.09.2021"}]