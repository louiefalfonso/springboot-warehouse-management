package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.InventoryDto;

import java.util.List;

public interface InventoryService {

    InventoryDto  createNewInventory( InventoryDto inventoryDto);

    InventoryDto getInventoryById(Long inventoryId);

    List<InventoryDto> getAllInventories();

    InventoryDto updateInventory(Long inventoryId, InventoryDto updateInventory);

    void deleteInventory(Long inventoryId);

    List<InventoryDto> getAllDeletedInventories();

    InventoryDto getDeletedInventoryById(Long id);
}
