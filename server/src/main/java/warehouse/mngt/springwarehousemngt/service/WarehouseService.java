package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.WarehouseDto;

import java.util.List;

public interface WarehouseService {

    WarehouseDto createNewWarehouse (WarehouseDto warehouseDto);

    WarehouseDto getWarehouseById(Long warehouseId);

    List<WarehouseDto> getAllWarehouses();

    WarehouseDto updateWarehouse(Long warehouseId, WarehouseDto updateWarehouse);

    void deleteWarehouse(Long warehouseId);

}
