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
    birthdayDay(){return true;}
    notBirthdayDay(){return false;}
}

class PizzaShop{
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

    getDiscountByPromocode(code){
        if(code === "ABC"){
            return 100;
        }
        return 0;
    }

    getBonusAccountDiscountAfterOrder(){
        return 5;
    }
}

//<Assert>.<Arrange>
// * Клиент может заказать пицу на сайте
suite('MakeOrder', function() {
    test('CanOrderPizza', function() {
        let pizzaShop = new PizzaShop();

        let pizzaOrdered = pizzaShop.makeOrder("pizza");

        assert.equal(true, pizzaOrdered);
    });
    test('rejectedOrderBear', function() {
        let pizzaShop = new PizzaShop();

        let bearOrdered = pizzaShop.makeOrder("bear");

        assert.equal(false, bearOrdered);
    })
});

//<ClassNameTests>.<Act>_<Arrange>_<Assert>
// * Если у клиента день рождения, ему полагается специальная сладкая пицца
suite('PizzaOrderTest', function() {
    test('OrderPizza_ClientBirthdayDay_RecieveGiftSweetPizza', function() {
        let client = new Client();
        let isBirthday = client.birthdayDay();
        let pizzaShop = new PizzaShop();

        let sweetPizzaGift = pizzaShop.orderBirthdayPizza(isBirthday);

        assert.equal(true, sweetPizzaGift);
    });
    test('OrderPizza_ClientNOTBirthdayDay_RecieveGiftSweetPizza', function() {
        let client = new Client();
        let isBirthday = client.notBirthdayDay();
        let pizzaShop = new PizzaShop();

        let sweetPizzaGift = pizzaShop.orderBirthdayPizza(isBirthday);

        assert.equal(false, sweetPizzaGift);
    })
});

//When<Action>.<Arrange><Assert>
// * При вводе промокода "ABCD", скидка 100 рублей
suite('WhenCodeWasEntered', function() {
    test('ClientGetDiscount100Rubles', function() {
        let pizzaShop = new PizzaShop();

        let discount = pizzaShop.getDiscountByPromocode(promocode);

        assert.equal(100, discount);
    });
    test('ClientCantGetDiscount500Rubles', function() {
       let pizzaShop = new PizzaShop();

        let discount = pizzaShop.getDiscountByPromocode(promocode);

        assert.equal(500, discount);
    })
});

// <ClassName>Should.<Assert>_<Arrange>
// * 5% от заказа на бонусный счет
suite('BonusAccountDiscountShould', function() {
    test('ShouldBe5Percent_Always', function() {
        let pizzaShop = new PizzaShop();

        let discountPercent = pizzaShop.getBonusAccountDiscountAfterOrder();

        assert.equal(5, discountPercent);
    });
    test('ShouldNOTBe50Percent_Always', function() {
        let pizzaShop = new PizzaShop();

        let discountPercent = pizzaShop.getBonusAccountDiscountAfterOrder();

        assert.equal(50, discountPercent);
    })
});



