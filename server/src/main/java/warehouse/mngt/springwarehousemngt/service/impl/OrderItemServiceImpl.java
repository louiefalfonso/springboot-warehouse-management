package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.OrderItemDto;
import warehouse.mngt.springwarehousemngt.entity.OrderItem;
import warehouse.mngt.springwarehousemngt.repository.OrderItemRepository;
import warehouse.mngt.springwarehousemngt.service.OrderItemService;

@Service
@AllArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private OrderItemRepository orderItemRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Order Item
    @Override
    public OrderItemDto createNewOrderItem(OrderItemDto orderItemDto) {
        OrderItem orderItem = modelMapper.map(orderItemDto, OrderItem.class);
        orderItem = orderItemRepository.save(orderItem);
        return modelMapper.map(orderItem, OrderItemDto.class);
    }


    // REST API - Get Order Item By ID
    @Override
    public OrderItemDto getOrderItemById(Long orderItemId) {
        OrderItem orderItem = orderItemRepository.findAllById(orderItemId)
                .orElseThrow(()-> new RuntimeException("Order Item doesn't exist with a given Id:" + orderItemId));
        return modelMapper.map(orderItem, OrderItemDto.class);
    }

}
