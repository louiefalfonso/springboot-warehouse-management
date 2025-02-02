package warehouse.mngt.springwarehousemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.OrderItemDto;
import warehouse.mngt.springwarehousemngt.entity.OrderItem;
import warehouse.mngt.springwarehousemngt.repository.OrderItemRepository;
import warehouse.mngt.springwarehousemngt.service.OrderItemService;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/order-items")
public class OrderItemController {

    private OrderItemRepository orderItemRepository;
    private OrderItemService orderItemService;

    //POST - Create New Order Item REST API
    @PostMapping
    public ResponseEntity<OrderItemDto>  createNewOrderItem(@RequestBody OrderItemDto orderItemDto){
        OrderItemDto savedOrderItem = orderItemService.createNewOrderItem(orderItemDto);
        return new ResponseEntity<>(savedOrderItem, HttpStatus.CREATED);
    }

    //GET - Get Order Item By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable ("id") Long id){
        OrderItem orderItem = orderItemRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Order Item does not exist with Id:" + id));
        return ResponseEntity.ok(orderItem);
    }
}
