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

    orderBirthdayPizza(isBirthday){
        if(isBirthday){
            return true;
        }
        return false;
    }

    birthdayDay(){return true;}
    notBirthdayDay(){return false;}

    getDiscountByPromocode(code){
        if(code === "ABC"){
            return 100;
        }
        return 0;
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

//<ClassNameTests>.<Act>_<Arrange>_<Assert>
// * Если у клиента день рождения, ему полагается специальная сладкая пицца
suite('PizzaOrderTest', function() {
    test('OrderPizza_ClientBirthdayDay_RecieveGiftSweetPizza', function() {
        let client = new Client();
        let isBirthday = client.birthdayDay();

        let sweetPizzaGift = client.orderBirthdayPizza(isBirthday);

        assert.equal(true, sweetPizzaGift);
    });
    test('OrderPizza_ClientNOTBirthdayDay_RecieveGiftSweetPizza', function() {
        let client = new Client();
        let isBirthday = client.notBirthdayDay();

        let sweetPizzaGift = client.orderBirthdayPizza(isBirthday);

        assert.equal(false, sweetPizzaGift);
    })
});

//When<Action>.<Arrange><Assert>
// * При вводе промокода "ABCD", скидка 100 рублей
suite('WhenCodeWasEntered', function() {
    test('ClientGetDiscount100Rubles', function() {
        let client = new Client();
        let promocode = "ABC";

        let discount = client.getDiscountByPromocode(promocode);

        assert.equal(100, discount);
    });
    test('ClientCantGetDiscount500Rubles', function() {
        let client = new Client();
        let promocode = "ABC";

        let discount = client.getDiscountByPromocode(promocode);

        assert.equal(500, discount);
    })
});

