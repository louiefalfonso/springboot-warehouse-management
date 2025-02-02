package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.OrderItemDto;

public interface OrderItemService {

    OrderItemDto createNewOrderItem(OrderItemDto orderItemDto);

    OrderItemDto getOrderItemById(Long orderItemId);
}
