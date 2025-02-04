package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.InventoryDto;
import warehouse.mngt.springwarehousemngt.entity.Inventory;
import warehouse.mngt.springwarehousemngt.repository.InventoryRepository;
import warehouse.mngt.springwarehousemngt.service.InventoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private InventoryRepository inventoryRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Inventory
    @Override
    public InventoryDto createNewInventory(InventoryDto inventoryDto) {
        Inventory inventory = modelMapper.map(inventoryDto, Inventory.class);
        Inventory savedInventory = inventoryRepository.save(inventory);
        return modelMapper.map(savedInventory, InventoryDto.class);
    }

    // REST API - Get Inventory By ID
    @Override
    public InventoryDto getInventoryById(Long inventoryId) {
        Inventory inventory = inventoryRepository.findAllById(inventoryId)
                .orElseThrow(()-> new RuntimeException("Inventory doesn't exist with a given Id:" + inventoryId));
        return modelMapper.map(inventoryId, InventoryDto.class);
    }

    // REST API - Get All Inventories
    @Override
    public List<InventoryDto> getAllInventories() {
        List<Inventory> inventories = inventoryRepository.findAll();
        return inventories.stream().map((inventory)-> modelMapper.map(inventory, InventoryDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Update Inventory
    @Override
    public InventoryDto updateInventory(Long inventoryId, InventoryDto updateInventory) {
        Inventory inventory = inventoryRepository.findAllById(inventoryId)
                .orElseThrow(()->new RuntimeException("Inventory doesn't exist with a given Id:" + inventoryId));

        inventory.setQuantity(updateInventory.getQuantity());
        inventory.setWarehouse(updateInventory.getWarehouse());
        inventory.setProduct(updateInventory.getProduct());

        Inventory updateInventoryObj = inventoryRepository.save(inventory);
        return modelMapper.map(updateInventoryObj, InventoryDto.class);
    }


    // REST API - Delete Inventory
    @Override
    public void deleteInventory(Long inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(()-> new RuntimeException("Inventory doesn't exist with given id:" + inventoryId));
        inventory.setDeleted(true);
        inventoryRepository.save(inventory);
    }


    // REST API - Get All Deleted Inventories
    @Override
    public List<InventoryDto> getAllDeletedInventories() {
        List<Inventory> deletedInventories = inventoryRepository.findByDeleted(true);
        return deletedInventories.stream()
                .map(inventory -> modelMapper.map(inventory, InventoryDto.class))
                .collect(Collectors.toList());
    }


    // REST API - Get Deleted Inventory By ID
    public InventoryDto getDeletedInventoryById(Long id){
        Inventory inventory = inventoryRepository.findByIdAndDeleted(id, true)
                .orElseThrow(()-> new RuntimeException("Deleted Inventory doesn't exist with a given Id:" + id));
        return modelMapper.map(inventory, InventoryDto.class);
    }
}
