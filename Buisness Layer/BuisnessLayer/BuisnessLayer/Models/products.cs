//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BuisnessLayer.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class products
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public products()
        {
            this.orderDetails = new HashSet<orderDetails>();
            this.shoppingCart = new HashSet<shoppingCart>();
        }
    
        public int productId { get; set; }
        public string productName { get; set; }
        public Nullable<int> categoryId { get; set; }
        public Nullable<decimal> price { get; set; }
        public string description { get; set; }
        public string imageUrl { get; set; }
    
        public virtual categories categories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<orderDetails> orderDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<shoppingCart> shoppingCart { get; set; }
    }
}
