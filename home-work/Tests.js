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
var assert = require('assert');

class Order {
    get orderTime() {return 15;}
    get pizzaQty() {return 2;}
}

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
        if(code === "ABCD"){
            return 100;
        }
        return 0;
    }

    getBonusAccountDiscountAfterOrder(){
        return 5;
    }

    getTimeAndQtyDiscount(time, qty){
        if(time >= 10 && time <= 16 && qty >= 2){
            return 20;
        }
        return 0;
    }
}

//<Assert>.<Arrange>
// * Клиент может заказать пицу на сайте
suite('MakeOrder', function() {
    // Можно еще назвать:
    // OrderPizza_Client_Accepted
    // GetPizza_IfClientMakeOrder
    // PizzaCanOrdered
    // Помоему PizzaCanOrdered лучше бы отражало содержимое теста
    test('CanOrderPizza', function() {
        let pizzaShop = new PizzaShop();

        let pizzaOrdered = pizzaShop.makeOrder("pizza");

        assert.equal(true, pizzaOrdered);
    });
    // Можно еще назвать:
    // OrderBear_Client_Rejected
    // NOTGetBear_IfClientMakeOrder
    // BearCanNotOrdered
    // Помоему BearCanNotOrdered лучше бы отражало содержимое теста
    test('rejectedOrderBear', function() {
        let pizzaShop = new PizzaShop();

        let bearOrdered = pizzaShop.makeOrder("bear");

        assert.equal(false, bearOrdered);
    })
});

//<ClassNameTests>.<Act>_<Arrange>_<Assert>
// * Если у клиента день рождения, ему полагается специальная сладкая пицца
suite('PizzaOrderTest', function() {
    // Можно еще назвать:
    // ClientRecieveSweetPizza
    // RecieveForClient
    // Помоему OrderPizza_ClientBirthdayDay_RecieveGiftSweetPizza лучше
    // отражает содержимое теста, сразу видно что тестируем какие входящие данные и что получим
    test('OrderPizza_ClientBirthdayDay_RecieveGiftSweetPizza', function() {
        let client = new Client();
        let isBirthday = client.birthdayDay();
        let pizzaShop = new PizzaShop();

        let sweetPizzaGift = pizzaShop.orderBirthdayPizza(isBirthday);

        assert.equal(true, sweetPizzaGift);
    });
    // Можно еще назвать:
    // ClientNOTRecieveSweetPizza
    // NOTRecieveForClient
    // Помоему OrderPizza_ClientNOTBirthdayDay_RecieveGiftSweetPizza лучше
    // отражает содержимое теста, сразу видно что тестируем какие входящие данные и что получим
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
        let promocode = "ABCD";

        let discount = pizzaShop.getDiscountByPromocode(promocode);

        assert.equal(100, discount);
    });
    test('ClientCanNOTGetDiscount500Rubles', function() {
       let pizzaShop = new PizzaShop();
        let promocode = "ABCD";

        let discount = pizzaShop.getDiscountByPromocode(promocode);

        assert.equal(false, discount === 500);
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

        assert.equal(false, discountPercent === 50);
    })
});

//When<Action>.<Arrange><Assert>
// * При заказе от 2х пицц с 10:00 по 16:00 скидка 20%
suite('WhenOrderPizzaNumIs2AndOrderTimeBetween10And16', function() {
    // Можно еще назвать:
    // OrderPizzaNumIs2AndOrderTimeBetween10And16_Client_GetDiscount
    // GetDiscount_IfClientOrderPizzaNumIs2AndOrderTimeBetween10And16
    // Помоему ClientGetDiscount20Percent лучше отражает содержимое теста
    test('ClientGetDiscount20Percent', function() {
        let pizzaShop = new PizzaShop();
        let order = new Order();
        let time = order.orderTime;
        let quantity = order.pizzaQty;

        let discount = pizzaShop.getTimeAndQtyDiscount(time, quantity);

        assert.equal(20, discount);
    });
    test('ClientCanNOTGetDiscount30Percent', function() {
        let pizzaShop = new PizzaShop();
        let order = new Order();
        let time = order.orderTime;
        let quantity = order.pizzaQty;

        let discount = pizzaShop.getTimeAndQtyDiscount(time, quantity);

        assert.equal(false, discount === 30);
    })
});



