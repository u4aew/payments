<template>
    <div class="user-badge">
        <div class="user-badge__wrapper">
            <div class="user-badge__cols">
                <div class="user-badge__cols-item">
                    <div class="user-badge__name">{{ user.title }}</div>
                </div>
                <div class="user-badge__cols-item">
                    <div class="user-badge__balance">
                        {{ user.balance}} ₽
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: 'UserBadge',
        data() {
            return {
                user: {}
            }
        },
        created() {
            Axios
                .get("/api/user.json")
                .then((response) => {
                    this.$store.dispatch('loadUser', {data: response.data});
                    this.user = this.$store.state.user;
                    this.$emit('loadUser', this.user);
                });

        }
    }
</script>
<style lang="stylus">
    .user-badge {
        &__cols {
            display flex
            align-items center
            margin-right -5px
            margin-left -5px
            &-item {
                margin-right 5px
                margin-left 5px
                flex 0 0 auto
            }
        }
        &__name {

        }
        &__balance {
            line-height 1
        }
    }
</style>