/**
 * Created by User on 13.10.2016.
 */
/**
 Заказ пиццы на сайте
 * Клиент может заказать пиццу на сайте
 * Если у клиента день рождения, ему полагается специальная сладкая пицца
 * При вводе промокода "ABCD", скидка 100 рублей
 * При заказе 2х пицц с 10:00 по 16:00 скидка 20%
 * 5% от заказа на бонусный счет
 * Для оплаты заказа можно использовать средства с бонусного счета
 */
import assert from 'assert'

class Client {
    makeOrder(product) {
        switch(product){
            case "pizza":
                return true;
            default: return false;
        }
    }
}

//<Assert>.<Arrange>
// * Клиент может заказать пицу на сайте
suite('MakeOrder', function() {
    test('CanOrderPizza', function() {
        let client = new Client();

        let pizzaOrdered = client.makeOrder("pizza");

        assert.equal(true, pizzaOrdered);
    });
    test('rejectedOrderBear', function() {
        let client = new Client();

        let bearOrdered = client.makeOrder("bear");

        assert.equal(false, bearOrdered);
    })
});