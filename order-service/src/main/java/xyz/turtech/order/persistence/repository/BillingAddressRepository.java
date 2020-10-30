package xyz.turtech.order.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import xyz.turtech.order.persistence.domain.BillingAddress;

@Repository
public interface BillingAddressRepository extends CrudRepository<BillingAddress, Long> {
}
