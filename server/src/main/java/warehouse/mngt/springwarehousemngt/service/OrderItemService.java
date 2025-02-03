package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.OrderItemDto;

import java.util.List;

public interface OrderItemService {

    OrderItemDto createNewOrderItem(OrderItemDto orderItemDto);

    OrderItemDto getOrderItemById(Long orderItemId);

    List<OrderItemDto> getAllOrderItems();

    OrderItemDto updateOrderItem(Long orderItemId, OrderItemDto updateOrderItem);

    void deleteOrderItem(Long orderItemId);

}
