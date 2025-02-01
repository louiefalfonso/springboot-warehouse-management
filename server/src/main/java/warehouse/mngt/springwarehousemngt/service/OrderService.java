package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.OrderDto;

import java.util.List;

public interface OrderService {

    OrderDto createNewOrder(OrderDto orderDto);

    OrderDto getOrderById(Long orderId);

    List<OrderDto> getAllOrders();

    /*
    OrderDTO updateOrder(Long id, OrderDTO orderDTO);
    void deleteOrder(Long id);
     */
}
