package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.OrderDto;
import warehouse.mngt.springwarehousemngt.entity.Order;
import warehouse.mngt.springwarehousemngt.repository.OrderRepository;
import warehouse.mngt.springwarehousemngt.service.OrderService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Order
    @Override
    public OrderDto createNewOrder(OrderDto orderDto) {
        Order order = modelMapper.map(orderDto, Order.class);
        Order savedOrder = orderRepository.save(order);
        return modelMapper.map(savedOrder, OrderDto.class);
    }

    // REST API - Get Order By ID
    @Override
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findAllById(orderId)
                .orElseThrow(()->new RuntimeException("Order doesn't exist with a given Id:" + orderId));
        return modelMapper.map(order, OrderDto.class);
    }

    // REST API - Get All Orders
    @Override
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map((order)-> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Update Order
    @Override
    public OrderDto updateOrder(Long orderId, OrderDto updateOrder) {
        Order order = orderRepository.findAllById(orderId)
                .orElseThrow(()-> new RuntimeException("Order doesn't exist with a given Id:" + orderId));

        order.setUser(updateOrder.getUserId());
        order.setOrderStatus(updateOrder.getOrderStatus());
        order.setOrderDate(updateOrder.getOrderDate());

        Order updateOrderObj = orderRepository.save(order);
        return modelMapper.map(updateOrderObj, OrderDto.class);

    }

    // REST API - Delete Order
    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findAllById(orderId)
                .orElseThrow(()-> new RuntimeException("Order doesn't exist with given id:" + orderId));
        orderRepository.deleteById(orderId);
    }
}
