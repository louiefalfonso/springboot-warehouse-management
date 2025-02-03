package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.OrderItemDto;
import warehouse.mngt.springwarehousemngt.entity.OrderItem;
import warehouse.mngt.springwarehousemngt.repository.OrderItemRepository;
import warehouse.mngt.springwarehousemngt.service.OrderItemService;

import java.util.List;
import java.util.stream.Collectors;

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

    // REST API - Get All Order Items
    @Override
    public List<OrderItemDto> getAllOrderItems() {
        List<OrderItem> orderItems = orderItemRepository.findAll();
        return orderItems.stream().map((orderItem)-> modelMapper.map(orderItem, OrderItemDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Update Order Item
    @Override
    public OrderItemDto updateOrderItem(Long orderItemId, OrderItemDto updateOrderItem) {
        OrderItem orderItem = orderItemRepository.findAllById(orderItemId)
                .orElseThrow(()-> new RuntimeException("Order Item doesn't exist with a given Id:" + orderItemId));

        orderItem.setOrder(updateOrderItem.getOrder());
        orderItem.setProduct(updateOrderItem.getProduct());
        orderItem.setQuantity(updateOrderItem.getQuantity());
        orderItem.setPrice(updateOrderItem.getPrice());

        OrderItem updateOrderItemObj = orderItemRepository.save(orderItem);
        return modelMapper.map(updateOrderItemObj, OrderItemDto.class);
    }

    // REST API - Delete Order Item
    @Override
    public void deleteOrderItem(Long orderItemId) {
        OrderItem orderItem = orderItemRepository.findAllById(orderItemId)
                .orElseThrow(()-> new RuntimeException("Order Item doesn't exist with given id:" + orderItemId));
        orderItemRepository.deleteById(orderItemId);
    }
}
