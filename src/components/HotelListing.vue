<template>
  <section class="hotel-search-results" @click="goToDetailPage">
    <div class="hotel-search-results__banner">
      <div class="hotel-search-results__banner__image">
        <img :src="hotelDetail.hotelImage" alt />
      </div>
      <div class="hotel-search-results__banner__card hotel-search-results__banner--earn">
        <span class="icon-Icon-Reward"></span>
        <span>Earn 125 miles!</span>
      </div>
      <!-- <div class="hotel-search-results__banner__card">
        <span class="icon-Icon-Time"></span>
        <span>Only 2 rooms lefts!</span>
      </div>-->
    </div>
    <div class="hotel-search-results__summary">
      <div class="hotel-search-results__summary__hotel-name">
        <h5>{{hotelDetail.hotelName }}</h5>
      </div>
      <div class="hotel-search-results__summary__address">
        <span>
          {{ }},
          {{ }}
        </span>
        <span>|</span>
        <span>Business Friendly</span>
        <span>+2</span>
      </div>
    </div>
    <div class="hotel-search-results__desc">
      <div class="hotel-search-results__desc__info">
        <div class="info">
          <div class="info__location">
            <span class="icon-Icon-Map-Pin"></span>
            <span>3 km from city</span>
          </div>
          <div class="info__rating">
            <div class="info__rating__icon">
              <span class="icon-Icon-Social-TripAdvisor"></span>
            </div>
            <div class="info__rating__stats">
              <span>{{ hotelDetail.numberStar}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default Vue.extend({
  name: "HotelSearchResults",
  props: {
    hotelDetail: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    console.log(this.isOnline);
  },
  components: {},
  methods: {
    goToDetailPage() {
      if (this.isOnline) {
        this.$router.push(`/detail/${this.hotelDetail.id}`);
      } else {
        alert("You are Offline");
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/_global.scss";
.hotel-search-results {
  background: white;
  margin-bottom: 20px;
  box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
  width: 100%;

  @include min-sm {
    width: 100%;
    height: calc(100% - 30px);
    margin-bottom: 30px;
  }
  &__banner {
    position: relative;
    min-height: 100px;
    // @include min-sm{
    //   min-height: 100px;
    // }
    &__image {
      img {
        width: 100%;
      }
    }
    &__card {
      display: flex;
      align-items: center;
      position: absolute;
      top: 10px;
      left: 10px;
      background: #f5455a;
      border-radius: 12px;
      padding: 6px 15px 7px 10px;
      span {
        font-size: 11px;
        color: white;
        font-weight: bold;
        margin-right: 5px;
        &:first-child {
          font-size: 15px;
          font-weight: normal;
        }
      }
    }
  }

  &__summary {
    padding: 20px 10px 18px 20px;
    @include min-sm {
      padding: 10px;
    }
    @include min-md {
      padding: 20px 10px 18px 12px;
    }
    &__hotel-name {
      min-height: 50px;
      h5 {
        font-size: 16px;
        margin-bottom: 0;
        @include min-sm {
          font-size: 14px;
        }
      }
    }

    &__address {
      span {
        font-size: 11px;
        font-weight: bold;
        // margin-right: 7px;
        &:nth-child(2) {
          font-weight: normal;
        }
      }
    }
  }

  &__desc {
    display: flex;
    @include min-sm {
      flex-direction: column;
    }
    &__info {
      width: 50%;
      //   border-right: 1px solid $border-color-gray-2;
      @include min-sm {
        width: 100%;
        border-right: none;
      }
      .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        @include min-sm {
          flex-direction: row;
        }
        &__location {
          width: 100%;
          height: 50%;
          //   border-bottom: 1px solid $border-color-gray-2;
          display: flex;
          align-items: center;
          padding: 10px;
          @include min-sm {
            border-right: 1px solid #dddee0;
          }
          @include min-xl {
            // border-right: 1px solid $border-color-gray-2;
            padding-left: 12px;
          }

          span {
            &:first-child {
              font-size: 18px;
            }
            &:last-child {
              font-size: 11px;
              //   color: $text-color-gray;
              margin-left: 10px;
            }
          }
        }

        &__rating {
          display: flex;
          align-items: center;
          padding: 3px 15px;
          @include min-sm {
            width: 100%;
            // border-bottom: 1px solid $border-color-gray-2;
            // border-left: 1px solid $border-color-gray-2;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }
          .rating-circle {
            margin-right: 5px;
            @include min-sm {
              margin-bottom: 3px;
            }
          }

          @include min-xl {
            flex-direction: row;
            justify-content: initial;
            align-items: center;
          }

          &__icon {
            margin-right: 8px;
            @include min-sm {
              display: none;
            }
            span {
              font-size: 20px;
              margin-top: 5px;
            }
          }

          &__stats {
            font-size: 11px;
            // color: $text-color-gray;
            @include min-xl {
              margin-left: 5px;
            }
          }
        }
      }
    }

    &__total-night {
      display: none;
      @include min-sm {
        display: block;
      }
      p {
        font-size: 11px;
        padding: 10px 0 0 15px;
        margin-bottom: 0;
      }
      @include min-xl {
        display: none;
      }
    }

    &__price {
      padding: 16px 12px 19px 18px;
      @include min-sm {
        width: 100%;
        padding: 12px;
      }
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include min-xl {
          align-items: flex-end;
          flex-direction: row;
        }
        &__value {
          &__mobile {
            font-size: 9px;
            margin-bottom: 5px;
            font-weight: bold;
            @include min-sm {
              display: none;
            }
          }

          &__desktop {
            display: none;
            @include min-xl {
              display: block;
              font-size: 11px;
              margin-bottom: 3px;
            }
          }

          h4 {
            font-size: 18px;
            margin-bottom: 0;
            font-weight: bold;
            min-height: 21px;
          }
        }
        &__button {
          display: none;
          @include min-sm {
            display: block;
            button {
              padding: 6px 0;
              border-radius: 3px;
              font-size: 13px;
              width: 102px;
            }
          }

          @include min-lg {
            button {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .price-loading {
    height: 30px;
    box-shadow: 2px 3px 14px 0px rgba(74, 74, 74, 0.25);
  }
}
</style>
