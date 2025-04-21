<template>
  <div>{{ displayNumber | currency }}</div>
</template>

<script>
export default {
  props: {'number': { default:0 } },
  data() {
    return {
      displayNumber:0,
      interval:false
    }
  },
  ready() {
    this.displayNumber = this.number ? this.number : 0;
  },
  watch: {
    number() {
      clearInterval(this.interval);
      if(this.number == this.displayNumber) {
        return;
      }
    
      this.interval = window.setInterval(function() {
        if(this.displayNumber != this.number) {
          var change = (this.number - this.displayNumber) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }.bind(this), 5);
    }
  },
  filters: {
    currency: function(value) {
      var x
      if (value) {
        x = value.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      } else {
        x = 0
      }
      if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY || x == "NaN") {
        x = 0
      }
      return x;
    }
  }
}
</script>
